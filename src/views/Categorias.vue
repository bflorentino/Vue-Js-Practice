<template>    

<Navigator />

    <RouterLink to="/categoria/crear" 
                class="bg- bg-cyan-400 rounded-lg px-2 py-1 self-end mr-3 mt-4"
    > 
        Crear Nueva
    </RouterLink>
        <div class="flex mt-2">
            <h1 class="text-center text-3xl font-bold">Categorias</h1>
        </div>

        <table class="w-4/5 mt-4">
        <thead class="text-md text-gray-700 bg-gray-50 uppercase">
            <tr> 
                <th 
                    scope="col" 
                    v-for="(field, i) in Object.keys(plantilladatos)" 
                    :key="i" 
                    class="px-6 py-3" 
                > 
                    {{ field  }}
                </th>
            </tr>
        </thead>

        <tbody>
            <tr 
                v-for="(info, i) in categorias" 
                :key="i" 
                class="bg-white nth-child(even):bg-gray-50"
            >
                <td scope="row" class="text-center px-6 py-4 w-[10%]">{{ info.idCategoria }}</td>
                <td class=" w-[25%]">{{ info.nombre }}</td>
                <td class=" w-[30%]">{{ info.descripcion }}</td>
                <td class="text-center py-1 flex justify-evenly h-full">
                    <span>
                        <RouterLink 
                            :to="{path: `/categoria/editar/${info.idCategoria}`}" 
                            class="text-blue-600 hover:underline"
                        >
                            Editar
                        </RouterLink>
                    </span>
                    <span>
                        <button 
                            class="text-blue-600 hover:underline"
                             @click="handleDelete(info.idCategoria)"
                        >
                            Eliminar
                        </button>
                    </span>
                    <span>
                        <RouterLink 
                            :to="{path: `/categoria/editar/${info.idCategoria}`}" 
                            class="text-blue-600 hover:underline"
                        >
                            Activar
                        </RouterLink>
                    </span>
                    <span>
                        <button class="text-blue-600 hover:underline" @click="handleDelete(info.idCategoria)">
                            Desactivar
                        </button>
                    </span>
                </td>
            </tr>
        </tbody>
    </table>

</template>

<script>
import Swal from 'sweetalert2';
import { RouterLink } from 'vue-router'
import Navigator from '../components/Navigator.vue'

export default{
    data() {
        return {
            categorias: [],
            plantilladatos: { Categoria: "", Nombre: "", Descripcion: "", Acciones:"" }
        };
    },

    async beforeMount() {
        this.categorias = await this.getCategorias();
    },
    
    methods: {
        async getCategorias() {
            const response = await fetch("https://localhost:7028/api/categorias");
            const data = await response.json();
            return data;
        },

        async deleteCategoria(idCategoria){
            const req = { method:'DELETE', }
            const res = await fetch(`https://localhost:7028/api/categorias/${idCategoria}`, req)

            return res
        },

        async handleDelete(idCategoria){

            const confirmation = await Swal.fire(
                {
                    title:"Estas seguro de que deseas elimina esta categoria?",
                    showCancelButton:true,
                    icon:'warning',
                    showConfirmButton:true,
                    confirmButtonText:"Aceptar",
                    denyButtonText:"Cancelar"
                 }
            )

            if(confirmation.isConfirmed){
                const res = await this.deleteCategoria(idCategoria)

                if(res.ok){
                    this.categorias = this.categorias.filter(c => c.idCategoria !== idCategoria)
                }
            }
        }
    },
    components: { RouterLink, Navigator }
}

</script>