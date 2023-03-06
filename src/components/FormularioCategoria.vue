<template>
 
    <form class="mt-4 flex flex-col w-2/5 px-2">

        <h1 class="font-bold text-2xl text-center">{{ titulo  }}</h1>

        <input 
            type="text"
            name="nombre"
            placeholder="Nombre de la categoria"
            class="px-2 py-1 bg-gray-200 mt-3 outline-none"
            v-model="nombreModel"
        />
        
        <textarea 
            name="descripcion" 
            placeholder="Agregue una descripcion"
            class="px-2 py-1 bg-gray-200 mt-3 outline-none"
            v-model="descripcionModel"
        />
        
        <button
            class="bg-cyan-400 mt-3 rounded py-1 hover:bg-cyan-600"
            @click.prevent="handleSubmit"
        >
            Guardar Cambios
    </button>
    </form>

</template>

<script>
    
    export default {
        props:['handleSubmit', 'nombre', 'descripcion', "titulo"],

        computed:{
            nombreModel:{
                get(){
                    return this.nombre
                },
                set(value){
                    this.$emit("eventNombre", value)
                }
            },
            descripcionModel:{
                get(){
                    return this.descripcion
                },
                set(value){
                    this.$emit("eventDescripcion", value)
                }
            }
        }
    }

</script>