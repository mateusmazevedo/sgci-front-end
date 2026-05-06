<template>
  <div>

    <q-form
      ref="formPessoa"
      greedy
      @submit.prevent="cadastrar"
      class="bg"
    >

      <div class="main-container">

        <div class="q-mb-md">
          <h4 class="title">Cadastrar Pessoa</h4>
          <div class="divisor-inline"></div>
        </div>

        <!-- DADOS BÁSICOS -->
        <div class="q-pa-md" style="margin-top: -30px">
          <h4 class="subTitulo">Dados Básicos</h4>

          <div class="row q-col-gutter-lg">

            <div class="col-7">
              <q-input
                v-model="pessoa.nome"
                label="Nome"
                dense
                :rules="[val => !!val || 'Campo Obrigatório']"
              />
            </div>

            <div class="col-2">
              <q-input
                v-model="pessoa.documento"
                label="Documento"
                dense
                :rules="[val => !!val || 'Campo Obrigatório']"
              />
            </div>

            <div class="col-3">
              <q-input
                v-model="pessoa.profissao"
                label="Profissão"
                dense
                :rules="[val => !!val || 'Campo Obrigatório']"
              />
            </div>

          </div>

          <!-- OPÇÕES -->
          <div class="row q-col-gutter-lg q-mt-lg">

            <div class="col-md-7">
              <q-field dense label="Tipo de Pessoa" borderless stack-label>
                <q-option-group
                  v-model="pessoa.tipo"
                  :options="optionsTipoPessoa"
                  type="radio"
                  inline
                />
              </q-field>
            </div>

            <div class="col-md-5">
              <q-field dense label="Estado Civil" borderless stack-label>
                <q-option-group
                  v-model="pessoa.estadoCivil"
                  :options="optionsEstadoCivil"
                  type="radio"
                  inline
                />
              </q-field>
            </div>

          </div>
        </div>

        <!-- ENDEREÇO -->
        <div class="q-pa-md" style="margin-top: -30px">
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
        <div class="row justify-end q-mt-md">

          <q-btn
            label="Voltar"
            flat
            class="q-mr-sm"
          />

          <q-btn
            label="Cadastrar"
            type="submit"
            color="primary"
          />

        </div>

      </div>

    </q-form>

  </div>
</template>

<script>
import { ref } from 'vue'
import { PessoaService } from 'src/services/sgci-api-service'

const pessoaService = new PessoaService()

export default {
  name: 'CreateEditPessoa',

  setup () {
    const formPessoa = ref(null)

    const pessoa = ref({
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

    const optionsTipoPessoa = ref([
      { label: 'Pessoa Física', value: 'PESSOA_FISICA' },
      { label: 'Pessoa Jurídica', value: 'PESSOA_JURIDICA' }
    ])

    const optionsEstadoCivil = ref([
      { label: 'Casado', value: 'CASADO' },
      { label: 'Solteiro', value: 'SOLTEIRO' },
      { label: 'Divorciado', value: 'DIVORCIADO' }
    ])

    const cadastrar = async () => {
      const form = formPessoa.value

      if (!form) {
        console.error('Form não encontrado')
        return
      }

      const valid = await form.validate()

      if (!valid) {
        console.log('Formulário inválido')
        return
      }

      try {
        console.log('ENVIANDO:', pessoa.value)

        await pessoaService.create(pessoa.value)

        console.log('✔ Cadastro realizado com sucesso')
      } catch (err) {
        console.error('❌ Erro ao cadastrar:', err?.response?.data || err)
      }
    }

    return {
      pessoa,
      formPessoa,
      cadastrar,
      optionsTipoPessoa,
      optionsEstadoCivil
    }
  }
}
</script>