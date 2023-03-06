import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import Categoria from "./views/Categorias.vue"
import AgregarCategoria from "./views/AgregaCategoria.vue"
import EditarCategoria from "./views/EditarCategoria.vue"

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history:createWebHistory(),
    routes:[ 
        {
            path:'/',
            name:'Categoria',
            component:Categoria
        },
        {
            path:"/categoria/crear",
            name: "AgregarCategoria",
            component: AgregarCategoria
        },
        {
            path:"/categoria/editar/:id",
            name:"EditarCategoria",
            component:EditarCategoria
        }
    
    ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')