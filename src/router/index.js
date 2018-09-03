import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'

// pages
import Index from '@/pages/Index'
import SignIn from '@/pages/SignIn'
import SignUp from '@/pages/SignUp'
import ForgetPassword from '@/pages/ForgetPassword'
import UserList from '@/pages/user/UserList'
import RoleList from '@/pages/role/RoleList'
import PermissionList from '@/pages/permission/PermissionList'
import CodeList from '@/pages/code/CodeList'
import CodeCategoryList from '@/pages/code/CodeCategoryList'
import MusicList from '@/pages/music/MusicList'
import MusicCategoryList from '@/pages/music/MusicCategoryList'
import FilmList from '@/pages/film/FilmList'
import FilmCategoryList from '@/pages/film/FilmCategoryList'
import BookList from '@/pages/book/BookList'
import BookCategoryList from '@/pages/book/BookCategoryList'
import Settings from '@/pages/Settings'
import Test from '@/pages/Test'

// components
import AppAsider from '@/components/AppAsider'
import AppHeader from '@/components/AppHeader'
import AppFooter from '@/components/AppFooter'

// cookie function
import {signInCookie, getCookie} from '@/utils/cookie'

Vue.use(Router)
Vue.use(Resource)

const routes = [
  {
    path: '/test',
    components: {
      'app-body': Test
    }
  },
  {
    path: '/',
    components: {
      'app-asider': AppAsider,
      'app-header': AppHeader,
      'app-body': Index,
      'app-footer': AppFooter
    }
  },
  {
    path: '/user/list',
    components: {
      'app-asider': AppAsider,
      'app-header': AppHeader,
      'app-body': UserList,
      'app-footer': AppFooter
    }
  },
  {
    path: '/role/list',
    components: {
      'app-asider': AppAsider,
      'app-header': AppHeader,
      'app-body': RoleList,
      'app-footer': AppFooter
    }
  },
  {
    path: '/permission/list',
    components: {
      'app-asider': AppAsider,
      'app-header': AppHeader,
      'app-body': PermissionList,
      'app-footer': AppFooter
    }
  },
  {
    path: '/code/list',
    components: {
      'app-asider': AppAsider,
      'app-header': AppHeader,
      'app-body': CodeList,
      'app-footer': AppFooter
    }
  },
  {
    path: '/code/categories',
    components: {
      'app-asider': AppAsider,
      'app-header': AppHeader,
      'app-body': CodeCategoryList,
      'app-footer': AppFooter
    }
  },
  {
    path: '/music/list',
    components: {
      'app-asider': AppAsider,
      'app-header': AppHeader,
      'app-body': MusicList,
      'app-footer': AppFooter
    }
  },
  {
    path: '/music/categories',
    components: {
      'app-asider': AppAsider,
      'app-header': AppHeader,
      'app-body': MusicCategoryList,
      'app-footer': AppFooter
    }
  },
  {
    path: '/film/list',
    components: {
      'app-asider': AppAsider,
      'app-header': AppHeader,
      'app-body': FilmList,
      'app-footer': AppFooter
    }
  },
  {
    path: '/film/categories',
    components: {
      'app-asider': AppAsider,
      'app-header': AppHeader,
      'app-body': FilmCategoryList,
      'app-footer': AppFooter
    }
  },
  {
    path: '/book/list',
    components: {
      'app-asider': AppAsider,
      'app-header': AppHeader,
      'app-body': BookList,
      'app-footer': AppFooter
    }
  },
  {
    path: '/book/categories',
    components: {
      'app-asider': AppAsider,
      'app-header': AppHeader,
      'app-body': BookCategoryList,
      'app-footer': AppFooter
    }
  },
  {
    path: '/settings',
    components: {
      'app-asider': AppAsider,
      'app-header': AppHeader,
      'app-body': Settings,
      'app-footer': AppFooter
    }
  },
  {
    path: '/signin',
    components: {
      'app-body': SignIn
    }
  },
  {
    path: '/signup',
    components: {
      'app-body': SignUp
    }
  },
  {
    path: '/forget/password',
    components: {
      'app-body': ForgetPassword
    }
  }
]

const router = new Router({
  routes
})

const self = new Vue()

router.beforeEach((to, from, next) => {
  // 注册登录 路由拦截
  if (to.path === '/signin') {
    if (signInCookie()) {
      router.push('/')
      self.$message({
        message: '当前状态已登录！',
        type: 'warning'
      })
    } else {
      next()
    }
  } else if (to.path === '/signup') {
    if (signInCookie()) {
      router.push('/')
      self.$message({
        message: '请先退出登录！',
        type: 'warning'
      })
    } else {
      next()
    }
  } else if (to.path === '/forget/password') {
    if (signInCookie()) {
      router.push('/')
      self.$message({
        message: '请先退出登录！',
        type: 'warning'
      })
    } else {
      next()
    }
  } else {
    if (signInCookie()) {
      next()
    } else {
      router.push('/signin')
      self.$message({
        message: '登录状态已失效，请重新登录！',
        type: 'warning'
      })
    }
  }
})

Vue.http.interceptors.push((request, next) => {
  if (request.url.indexOf('signin') > 0) {
  } else {
    let token = getCookie('sessionToken')
    Vue.http.headers.common.Authorization = token
  }
  next()
})

export default router
