<template>
    <Navigator />

    <formCategoria 
        @eventNombre="updateNombre" 
        @eventDescripcion="updateDescripcion"
        :handleSubmit="handleSubmit" 
        :nombre ="nombre"
        :descripcion="descripcion"
        :titulo="titulo"
    />

</template>

<script>

import Navigator from "../components/Navigator.vue"
import formCategoria from "../components/FormularioCategoria.vue"
import Swal from "sweetalert2"

export default {
    data(){
        return {
            nombre:"",
            descripcion:"",
            titulo:"Registro de Categorias"
        }
    },

    components:{Navigator, formCategoria},

    methods:{

        async handleSubmit(){            
            // Validaciones de datos
            if(this.nombre.length < 3){
                Swal.fire("Error", "El campo nombre debe de tener al menos 3 caracteres", "error")
                return
            }

            if(this.nombre.length > 50){
                Swal.fire("Error", "El nombre no debe ser mayor a 50 caracteres")
                return
            }

            const body = { nombre:this.nombre, descripcion:this.descripcion }
            const res = await this.postCategoria(body)

            if(!res.ok) {
                Swal.fire("Error", "Ha habido un error en el servidor", "error")
                return
            }

            Swal.fire("Cambios guardados", "Los cambios se han guardado correctamente", "success")

            this.$router.push({path:"/"})
        },

        async postCategoria(body){
            const req = {
                method:"POST",
                body:JSON.stringify(body),
                headers:{'Content-Type':'application/json'}
            }

            const res = await fetch("https://localhost:7028/api/categorias", req)
            return res
        },

        updateNombre(value){this.nombre = value},

        updateDescripcion(value){this.descripcion = value}   
    }
}

</script>