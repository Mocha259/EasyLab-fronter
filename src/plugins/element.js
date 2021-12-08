import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { Button } from 'element-ui'
import { Form, FormItem } from 'element-ui'
import { Input } from 'element-ui'
import { Carousel, CarouselItem } from 'element-ui'
//导入弹框提示组件
import { Message } from 'element-ui'
import { Container, Header, Aside, Main } from 'element-ui'


Vue.use(ElementUI)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)

Vue.prototype.$message = Message