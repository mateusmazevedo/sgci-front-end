<template>
  <div>
    <q-form ref="formPessoa" greedy @submit.prevent="cadastrarOuAtualizar" class="bg">

      <div class="main-container">

        <div class="q-mb-md">
          <h4 class="title">
            {{ pessoa.id ? 'Editar Pessoa' : 'Cadastrar Pessoa' }}
          </h4>
          <div class="divisor-inline"></div>
        </div>

        <!-- DADOS BÁSICOS -->
        <div class="q-pa-md">

          <h4 class="subTitulo">Dados Básicos</h4>

          <div class="row q-col-gutter-lg">
            <div class="col-7">
              <q-input v-model="pessoa.nome" label="Nome" dense />
            </div>

            <div class="col-2">
              <q-input v-model="pessoa.documento" label="Documento" dense />
            </div>

            <div class="col-3">
              <q-input v-model="pessoa.profissao" label="Profissão" dense />
            </div>
          </div>

          <div class="row q-col-gutter-lg q-mt-md">

            <div class="col-7">
              <q-option-group
                v-model="pessoa.tipo"
                :options="optionsTipoPessoa"
                type="radio"
                inline
              />
            </div>

            <div class="col-5">
              <q-option-group
                v-model="pessoa.estadoCivil"
                :options="optionsEstadoCivil"
                type="radio"
                inline
              />
            </div>

          </div>

        </div>

        <!-- ENDEREÇO -->
        <div class="q-pa-md">

          <h4 class="subTitulo">Endereço</h4>

          <div class="row q-col-gutter-lg">

            <div class="col-2">
              <q-input v-model="pessoa.endereco.cep" label="CEP" dense />
            </div>

            <div class="col-3">
              <q-input v-model="pessoa.endereco.estado" label="Estado" dense />
            </div>

            <div class="col-4">
              <q-input v-model="pessoa.endereco.cidade" label="Cidade" dense />
            </div>

            <div class="col-3">
              <q-input v-model="pessoa.endereco.bairro" label="Bairro" dense />
            </div>

            <div class="col-9">
              <q-input v-model="pessoa.endereco.rua" label="Rua" dense />
            </div>

            <div class="col-3">
              <q-input v-model="pessoa.endereco.numero" label="Número" dense />
            </div>

          </div>

        </div>

        <!-- BOTÕES -->
        <div class="row q-mt-md">

          <div class="col-12 text-right">

            <q-btn
              label="Voltar"
              flat
              class="q-mr-sm"
              @click="voltar"
            />

            <q-btn
              type="submit"
              color="primary"
              :label="pessoa.id ? 'Atualizar' : 'Cadastrar'"
            />

          </div>

        </div>

      </div>

    </q-form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { pessoaService } from 'src/services/sgci-api-service'

export default {
  name: 'CreateEditPessoa',

  setup () {
    const route = useRoute()
    const router = useRouter()
    const $q = useQuasar()

    const pessoa = ref({
      id: null,
      nome: '',
      documento: '',
      profissao: '',
      tipo: null,
      estadoCivil: null,
      endereco: {
        cep: '',
        estado: '',
        cidade: '',
        bairro: '',
        rua: '',
        numero: ''
      }
    })

    const optionsTipoPessoa = [
      { label: 'Pessoa Física', value: 'PESSOA_FISICA' },
      { label: 'Pessoa Jurídica', value: 'PESSOA_JURIDICA' }
    ]

    const optionsEstadoCivil = [
      { label: 'Casado', value: 'CASADO' },
      { label: 'Solteiro', value: 'SOLTEIRO' },
      { label: 'Divorciado', value: 'DIVORCIADO' }
    ]

    const carregarPessoa = async () => {
      const id = route.params.id
      if (!id) return

      try {
        const res = await pessoaService.getById(id)
        pessoa.value = res.data
      } catch (err) {
        console.error('Erro ao carregar:', err)
      }
    }

    const cadastrarOuAtualizar = async () => {
      try {
        if (pessoa.value.id) {
          await pessoaService.update(pessoa.value.id, pessoa.value)

          $q.notify({
            message: 'Atualizado com sucesso!',
            color: 'positive'
          })
        } else {
          await pessoaService.create(pessoa.value)

          $q.notify({
            message: 'Cadastrado com sucesso!',
            color: 'positive'
          })
        }

        router.push('/pessoas')
      } catch (err) {
        console.error('Erro salvar:', err)
        $q.notify({
          message: 'Erro ao salvar',
          color: 'negative'
        })
      }
    }

    const voltar = () => {
      router.push('/pessoas')
    }

    onMounted(() => {
      carregarPessoa()
    })

    return {
      pessoa,
      optionsTipoPessoa,
      optionsEstadoCivil,
      cadastrarOuAtualizar,
      voltar
    }
  }
}
</script>