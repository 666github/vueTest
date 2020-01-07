import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Hellomy from '@/components/Hellomy'
import Hellomy2 from '@/components/Hellomy2'
Vue.use(Router)

export default new Router({ 
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/hellomy',
      name: 'Hellomy',
      component: Hellomy,
      beforeEnter: (to, from, next) => {
        console.log(to,from,next);
        next();
      }
    },
    {
      path: '/hellomy2',
      name: 'Hellomy2',
      component: Hellomy2
    }
  ],
  mode:'history'//干掉url的#
})
