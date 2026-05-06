<template>
  <div>
    <q-form
      ref="formPessoa"
      greedy
      @submit.prevent="salvar"
      class="bg"
    >
      <div class="main-container">
        <div class="q-mb-md">
          <h4 class="title">
            {{ id ? 'Editar Pessoa' : 'Cadastrar Pessoa' }}
          </h4>
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
                :rules="[vRequired]"
                lazy-rules
              />
            </div>

            <div class="col-2">
              <q-input
                v-model="pessoa.documento"
                label="Documento"
                dense
                :rules="[vRequired]"
                lazy-rules
              />
            </div>

            <div class="col-3">
              <q-input
                v-model="pessoa.profissao"
                label="Profissão"
                dense
                :rules="[vRequired]"
                lazy-rules
              />
            </div>
          </div>

          <!-- OPÇÕES -->
          <div class="row q-col-gutter-lg q-mt-lg">
            <div class="col-md-7">
              <q-field
                dense
                label="Tipo de Pessoa"
                borderless
                stack-label
                :rules="[vRequired]"
                :model-value="pessoa.tipo"
              >
                <q-option-group
                  v-model="pessoa.tipo"
                  :options="optionsTipoPessoa"
                  type="radio"
                  inline
                />
              </q-field>
            </div>

            <div class="col-md-5">
              <q-field
                dense
                label="Estado Civil"
                borderless
                stack-label
                :rules="[vRequired]"
                :model-value="pessoa.estadoCivil"
              >
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
              <q-input v-model="pessoa.endereco.cep" label="CEP" dense :rules="[vRequired]" lazy-rules />
            </div>

            <div class="col-3">
              <q-input v-model="pessoa.endereco.estado" label="Estado" dense :rules="[vRequired]" lazy-rules />
            </div>

            <div class="col-4">
              <q-input v-model="pessoa.endereco.cidade" label="Cidade" dense :rules="[vRequired]" lazy-rules />
            </div>

            <div class="col-3">
              <q-input v-model="pessoa.endereco.bairro" label="Bairro" dense :rules="[vRequired]" lazy-rules />
            </div>

            <div class="col-9">
              <q-input v-model="pessoa.endereco.rua" label="Rua" dense :rules="[vRequired]" lazy-rules />
            </div>

            <div class="col-3">
              <q-input v-model="pessoa.endereco.numero" label="Número" dense :rules="[vRequired]" lazy-rules />
            </div>
          </div>
        </div>

        <!-- BOTÕES -->
        <div class="row justify-end q-mt-md">
          <q-btn label="Voltar" flat class="q-mr-sm" />

          <q-btn
            :label="id ? 'Atualizar' : 'Cadastrar'"
            type="submit"
            color="primary"
          />
        </div>
      </div>
    </q-form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { PessoaService } from 'src/services/sgci-api-service'
import validators from 'src/validators/validator-set'

const pessoaService = new PessoaService()

export default {
  name: 'CreateEditPessoa',

  setup () {
    const formPessoa = ref(null)
    const route = useRoute()

    // 🔥 ID vindo da URL (ESSENCIAL)
    const id = route.params.id

    const { vRequired } = validators

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

    // 🔹 BUSCAR DADOS PARA EDIÇÃO
    const buscarPessoaParaEdicao = async () => {
      if (!id) return

      try {
        const retorno = await pessoaService.getById(id)
        pessoa.value = retorno.data
      } catch (err) {
        console.error('Erro ao buscar pessoa', err)
      }
    }

    // 🔹 SALVAR (CREATE OU UPDATE)
    const salvar = async () => {
      const form = formPessoa.value

      if (!form) return

      const valid = await form.validate()

      if (!valid) return

      try {
        if (id) {
          await pessoaService.update(id, pessoa.value)
          console.log('✔ Atualizado com sucesso')
        } else {
          await pessoaService.create(pessoa.value)
          console.log('✔ Cadastrado com sucesso')
        }
      } catch (err) {
        console.error('❌ Erro:', err?.response?.data || err)
      }
    }

    // 🔹 EQUIVALENTE AO mounted
    onMounted(() => {
      buscarPessoaParaEdicao()
    })

    return {
      pessoa,
      formPessoa,
      salvar,
      optionsTipoPessoa,
      optionsEstadoCivil,
      vRequired,
      id
    }
  }
}
</script>