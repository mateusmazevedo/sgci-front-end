<template>
  <div class="q-pa-md bg">
    <div class="main-container">

      <div class="q-mb-md">
        <h4 class="title">Consultar Pessoas</h4>
        <div class="divisor-inline"></div>
      </div>

      <q-table
        flat
        bordered
        ref="tableRef"
        :rows="rows"
        :columns="columns"
        row-key="id"
        v-model:pagination="pagination"
        :loading="loading"
        @request="buscarPessoas"
      >

        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="text-center">

            <q-btn icon="visibility" flat round size="sm"
              @click="visualizar(props.row)" />

            <q-btn icon="edit" flat round size="sm"
              @click="editar(props.row)" />

            <q-btn icon="delete" flat round size="sm" color="red"
              @click="confirmarRemocao(props.row)" />

          </q-td>
        </template>

      </q-table>

      <div class="row justify-between q-mt-md">

        <q-btn label="Baixar CSV" color="secondary" @click="baixarCsv" />

        <q-btn label="Cadastrar" color="primary" @click="cadastrar" />

      </div>

    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { pessoaService } from 'src/services/sgci-api-service.js'

const columns = [
  { name: 'id', label: 'ID', field: 'id', align: 'center' },
  { name: 'nome', label: 'Nome', field: 'nome', align: 'left' },
  { name: 'documento', label: 'Documento', field: 'documento', align: 'left' },
  { name: 'profissao', label: 'Profissão', field: 'profissao', align: 'left' },
  { name: 'estadoCivil', label: 'Estado Civil', field: 'estadoCivil', align: 'left' },
  { name: 'actions', label: 'Ações', field: 'actions', align: 'center' }
]

export default {
  setup () {
    const quasar = useQuasar()
    const router = useRouter()

    const tableRef = ref(null)
    const rows = ref([])
    const loading = ref(false)

    const pagination = ref({
      page: 1,
      rowsPerPage: 5,
      rowsNumber: 0
    })

    async function buscarPessoas (props) {
      loading.value = true

      const page = props?.pagination?.page || pagination.value.page
      const rowsPerPage = props?.pagination?.rowsPerPage || pagination.value.rowsPerPage

      try {
        const { data } = await pessoaService.findAll({
          page: page - 1,
          size: rowsPerPage,

          // 🔥 obrigatório pelo backend
          ordenarPor: 'id',
          direction: 'ASC'
        })

        rows.value = data?.data || []
        pagination.value.page = (data?.page ?? 0) + 1
        pagination.value.rowsNumber = data?.totalRecords ?? 0

      } catch (err) {
        console.error('ERRO LISTAR:', err.response?.data || err)
        rows.value = []
        pagination.value.rowsNumber = 0
      }

      loading.value = false
    }

    function cadastrar () {
      router.push('/pessoas/form')
    }

    function editar (row) {
      router.push(`/pessoas/form/${row.id}`)
    }

    function visualizar (row) {
      router.push(`/pessoas/view/${row.id}`)
    }

    async function confirmarRemocao (row) {
      quasar.dialog({
        title: 'Confirmar',
        message: 'Deseja excluir?',
        cancel: true,
        persistent: true
      }).onOk(async () => {
        try {
          await pessoaService.delete(row.id)

          quasar.notify({
            message: 'Excluído com sucesso',
            color: 'positive'
          })

          buscarPessoas()

        } catch (err) {
          console.error(err)

          quasar.notify({
            message: 'Erro ao excluir',
            color: 'negative'
          })
        }
      })
    }

    async function baixarCsv () {
      try {
        const res = await pessoaService.exportar()

        const url = window.URL.createObjectURL(new Blob([res.data]))
        const link = document.createElement('a')

        link.href = url
        link.setAttribute('download', 'pessoas.csv')
        document.body.appendChild(link)
        link.click()

      } catch (err) {
        console.error('Erro CSV:', err)
      }
    }

    onMounted(() => {
      buscarPessoas()
    })

    return {
      tableRef,
      rows,
      columns,
      loading,
      pagination,
      buscarPessoas,
      cadastrar,
      editar,
      visualizar,
      confirmarRemocao,
      baixarCsv
    }
  }
}
</script>