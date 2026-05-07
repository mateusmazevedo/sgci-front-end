<template>
  <div>
    <q-form greedy class="bg">

      <div class="main-container">

        <div class="q-mb-md">
          <h4 class="title">Visualizar Pessoa</h4>
          <div class="divisor-inline"></div>
        </div>

        <div class="q-pa-md">

          <h4 class="subTitulo">Dados Básicos</h4>

          <div class="row q-col-gutter-lg">
            <div class="col-5">
              Nome: {{ pessoa?.nome }}
            </div>
            <div class="col-4">
              Profissão: {{ pessoa?.profissao }}
            </div>
            <div class="col-3">
              Documento: {{ pessoa?.documento }}
            </div>
            <div class="col-5">
              Tipo: {{ formatarPessoa(pessoa?.tipo) }}
            </div>
            <div class="col-4">
              Estado Civil: {{ formatarEstadoCivil(pessoa?.estadoCivil) }}
            </div>
          </div>

        </div>

        <div class="q-pa-md">

          <h4 class="subTitulo">Endereço</h4>

          <div class="row q-col-gutter-lg">
            <div class="col-5">CEP: {{ pessoa?.endereco?.cep }}</div>
            <div class="col-4">Estado: {{ pessoa?.endereco?.estado }}</div>
            <div class="col-3">Cidade: {{ pessoa?.endereco?.cidade }}</div>
            <div class="col-5">Bairro: {{ pessoa?.endereco?.bairro }}</div>
            <div class="col-5">Rua: {{ pessoa?.endereco?.rua }}</div>
            <div class="col-3">Número: {{ pessoa?.endereco?.numero }}</div>
          </div>

        </div>

        <div class="row q-mt-md">
          <div class="col-12 text-right">
            <q-btn label="Voltar" @click="voltar" />
          </div>
        </div>

      </div>

    </q-form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { pessoaService } from 'src/services/sgci-api-service'

export default {
  setup () {
    const route = useRoute()
    const router = useRouter()

    const pessoa = ref(null)

    const carregar = async () => {
      const id = route.params.id
      if (!id) return

      const res = await pessoaService.getById(id)
      pessoa.value = res.data
    }

    const voltar = () => {
      router.push('/pessoas')
    }

    const formatarPessoa = (v) =>
      v === 'PESSOA_JURIDICA' ? 'Pessoa Jurídica' : 'Pessoa Física'

    const formatarEstadoCivil = (v) => {
      if (v === 'CASADO') return 'Casado'
      if (v === 'SOLTEIRO') return 'Solteiro'
      if (v === 'DIVORCIADO') return 'Divorciado'
      return ''
    }

    onMounted(carregar)

    return {
      pessoa,
      voltar,
      formatarPessoa,
      formatarEstadoCivil
    }
  }
}
</script>