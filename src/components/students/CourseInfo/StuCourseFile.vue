<template>
  <div>
    <el-divider></el-divider>

    <div class="left" style="float: left; width: 20%">
      <div class="file-tree" style="margin-left: -50px; margin-top: -50px">
        <h2>文件目录</h2>
        <el-tree
          :data="treeData"
          node-key="id"
          @node-click="showFiles"
          :expand-on-click-node="false"
          default-expand-all
          style="width: 335px"
        >
          <span class="custom-tree-node" slot-scope="{node}">
            <span style="text-align: center; font-size: 15px; height; 50px"><i class="el-icon-folder-opened"></i>{{ node.label}}</span>
          </span>
        </el-tree>
      </div>
    </div>
    <div class="right" style="float: right; width: 68.5%">
      <div style="margin-top: -50px">
        <span style="font-size: 20px; font-weight: 1000"> 当前目录：</span>
        <i class="el-icon-folder-opened" style="font-size: 20px"></i>
        <span style="font-size: 20px">{{ selectedFolder.folder_name }}</span>
      </div>

      <el-table
        :data="existedFileList"
        :border="false"
        :row-style="{ height: '20px' }"
      >
        <el-table-column fixed prop="file_name" label="文件名称">
          <template slot-scope="scope">
            <div v-if="scope.row.file_type == 'folder'">
              <i class="el-icon-folder-opened"></i>{{ scope.row.file_name }}
            </div>
            <div v-else>
              <i class="el-icon-document"></i>{{ scope.row.file_name }}
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="file_time" label="文件大小"> </el-table-column>

        <el-table-column prop="file_time" label="修改日期"> </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <div v-if="scope.row.file_type != 'folder'">
              <el-button type="text" size="small" @click="getInfo(scope.row)"
                >下载</el-button
              >
            </div>
            <div v-else>
              <el-button type="text" size="small">进入文件夹</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
let id = 1000;
export default {
  data() {
    return {
      dialogOfUpload: false,
      headers: {},
      uploadFileList: [],
      existedFileList: [],
      treeData: [], /// 绑定el-tree进行实际展示
      allFolders: {}, /// 后端传来的原始文件树
      curFolder: { id: "", label: "", children: [] }, /// 保存符合展示规则的文件树
      create_dir: false, /// 创建新文件时对话框
      tmp_new_dir: {
        /// 创建的新文件夹时用来存临时变量
        dir_name: "",
      },
      selectedFolder: { folder_id: "", folder_name: "" },
      fileList: [],
    };
  },
  methods: {
    openDialog() {
      this.dialogOfUpload = true;
    },

    handleChange(file, fileList) {
      this.fileList = fileList;
    },

    arrayPath() {
      return this.filePath.split("/").slice(1);
    },

    /// 自动默认展示的文件列表
    autoGetFileList(data) {
      this.existedFileList.splice(0);
      this.$http({
        method: "get",
        url: "course/findFiles/" + data.folder_id,
        headers: { token: window.sessionStorage.getItem("token") },
      }).then((response) => {
        for (var i = 0; i < response.data.data.files.length; i++) {
          this.existedFileList.push({
            file_name:
              response.data.data.files[i].file_name +
              "." +
              response.data.data.files[i].file_type,
            file_time: response.data.data.files[i].upload_time.slice(0, 10),
            file_type: response.data.data.files[i].file_type,
            file_url: response.data.data.files[i].file_url,
          });
        }
        this.$http({
          method: "get",
          url: "course/findDirs/" + data.folder_id,
          headers: { token: window.sessionStorage.getItem("token") },
        }).then((response) => {
          // console.log(response.data)
          console.log(response.data);
          for (var i = 0; i < response.data.data.folders.length; i++) {
            this.existedFileList.push({
              file_name: response.data.data.folders[i].folder_name,
              file_time: response.data.data.folders[i].create_time.slice(0, 10),
              file_type: "folder",
              file_url: response.data.data.folders[i].folders_url,
            });
          }
        });
      });
    },

    showFiles(data, node) {
      this.existedFileList.splice(0);
      this.selectedFolder.folder_id = data.id;
      this.selectedFolder.folder_name = data.label;
      console.log(this.selectedFolder.folder_id);
      this.$http({
        method: "get",
        url: "course/findFiles/" + data.id,
        headers: { token: window.sessionStorage.getItem("token") },
      }).then((response) => {
        for (var i = 0; i < response.data.data.files.length; i++) {
          this.existedFileList.push({
            file_name:
              response.data.data.files[i].file_name +
              "." +
              response.data.data.files[i].file_type,
            file_time: response.data.data.files[i].upload_time.slice(0, 10),
            file_type: response.data.data.files[i].file_type,
            file_url: response.data.data.files[i].file_url,
          });
        }
        this.$http({
          method: "get",
          url: "course/findDirs/" + data.id,
          headers: { token: window.sessionStorage.getItem("token") },
        }).then((response) => {
          // console.log(response.data)
          console.log(response.data);
          for (var i = 0; i < response.data.data.folders.length; i++) {
            this.existedFileList.push({
              file_name: response.data.data.folders[i].folder_name,
              file_time: response.data.data.folders[i].create_time.slice(0, 10),
              file_type: "folder",
              file_url: response.data.data.folders[i].folders_url,
            });
          }
          console.log(this.existedFileList);
        });
      });
    },

    childrenFiles(data) {
      let result = [];
      for (let i = 0; i < data.length; i++) {
        result.push({
          label: data[i],
        });
      }
      return result;
    },

    getAllFolders() {
      var data = new FormData();
      let that = this;
      data.append( "course_id", parseInt(JSON.parse(this.$route.query.course_info).course_id));
      this.$http({
        method: "post",
        url: "/course/findAllFoldersAndFiles",
        data: data,
        headers: {
          token: window.sessionStorage.getItem("token"),
        },
      })
        .then((response) => {
          var rootFolder = response.data.data.fullFolder;
            console.log('fullFolder',rootFolder)
          that.allFolders = rootFolder;
          that.selectedFolder.folder_id = rootFolder.folder_id;
          that.selectedFolder.folder_name = rootFolder.folder_name;

          that.autoGetFileList(that.selectedFolder);

          that.getFolderTree(that.curFolder, that.allFolders);

          that.treeData.push(that.curFolder);

        })
        .catch((error) => {
          console.log(error);
        });
    },

    /// 生成文件树数据fileData
    getFolderTree(tmp_node, cur_node) {
      tmp_node.id = cur_node.folder_id;
      tmp_node.label = cur_node.folder_name;

      for (var i = 0; i < cur_node.fullFolderList.length; i++) {
        var tmp = { id: "", label: "", children: [] };
        tmp.id = cur_node.fullFolderList[i].folder_id;
        tmp.label = cur_node.fullFolderList[i].folder_name;
        tmp_node.children.push(tmp);
      }

      for (var i = 0; i < tmp_node.children.length; i++) {
        this.getFolderTree(tmp_node.children[i], cur_node.fullFolderList[i]);
      }
    },

    uploadFile() {
      let self = this;
      var data = new FormData();
      data.append("file", this.fileList[0].raw);
      data.append("dir", this.selectedFolder.folder_name);
      data.append("folder_id", this.selectedFolder.folder_id);

      var config = {
        method: "post",
        url: "/course/addFile",
        data: data,
        headers: {
          token: window.sessionStorage.getItem("token"),
          // "Content-Type": "application/json"
        },
      };
      this.$http(config)
        .then(function (response) {
          console.log(response.data);
          if (response.data.success) {
            self.dialogOfUpload = false;
            self.autoGetFileList(self.selectedFolder);
            self.$message.success("文件上传成功！");
          } else {
            self.$message.error("文件上传失败，请重试！");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    getInfo(row) {
      this.$http({
        url: row.file_url,
        method: "get",
        headers: {
          Authorization: "Auth String",
          "content-type": "application/octet-stream",
        },
        responseType: "blob",
      }).then((response) => {
        let blob = new Blob([response.data]);
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = row.file_name; //这里需要文件名，应该获取原本的文件名及后缀
        link.click();
        //释放内存
        window.URL.revokeObjectURL(link.href);
      });
    },
  },
  mounted() {
    this.getAllFolders();
  },
};
</script>

<style lang="less" scoped>
.left {
  margin-top: 70px;
  float: left;
  margin-left: 5%;
  width: 30%;
}
.right {
  margin-top: 70px;
  float: right;
  width: 100%;
}
.el-table {
  // position: absolute;
  // left: 5%;
  // margin-top: 70px;
  width: 100%;
  float: right;
}
.el-table-column {
  width: 25%;
}
.upload-demo {
  // width: 300px;;
  width: 20% !important;
}

.upload-button {
  position: absolute;
  left: 5% !important;
  // margin-left: 0px !important;
}

.el-upload__tip {
  position: absolute;
  left: 5%;
  margin-top: 50px;
}
.el-upload-list {
  background-color: black !important;
}
.demo-tree-render .ivu-tree-title {
  width: 100%;
}

.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  height: 50px !important;
}
.add-folder:hover {
  background: transparent;
  i:hover {
    font-weight: 2000 !important;
    background: black !important;
  }
}
.add-folder:focus {
  background: transparent;
}
</style>