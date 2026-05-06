<template>
  <div>
    <div class="main-container">

      <!-- TÍTULO -->
      <div class="q-mb-md">
        <h4 class="title">Visualizar Pessoa</h4>
        <div class="divisor-inline"></div>
      </div>

      <!-- DADOS BÁSICOS -->
      <div class="cardVisualizacao q-mb-md">
        <h4 class="subTitulo">Dados Básicos</h4>

        <div class="itemLinha">
          <span class="tituloVisualizar">Nome</span>
          <span class="valorVisualizar">{{ pessoa.nome }}</span>
        </div>

        <div class="itemLinha">
          <span class="tituloVisualizar">Documento</span>
          <span class="valorVisualizar">{{ pessoa.documento }}</span>
        </div>

        <div class="itemLinha">
          <span class="tituloVisualizar">Profissão</span>
          <span class="valorVisualizar">{{ pessoa.profissao }}</span>
        </div>

        <div class="itemLinha">
          <span class="tituloVisualizar">Tipo de Pessoa</span>
          <span class="valorVisualizar">
            {{ formatTipoPessoa(pessoa.tipo) }}
          </span>
        </div>

        <div class="itemLinha">
          <span class="tituloVisualizar">Estado Civil</span>
          <span class="valorVisualizar">
            {{ formatEstadoCivil(pessoa.estadoCivil) }}
          </span>
        </div>
      </div>

      <!-- ENDEREÇO -->
      <div class="cardVisualizacao q-mb-md">
        <h4 class="subTitulo">Endereço</h4>

        <div class="itemLinha">
          <span class="tituloVisualizar">CEP</span>
          <span class="valorVisualizar">{{ pessoa.endereco.cep }}</span>
        </div>

        <div class="itemLinha">
          <span class="tituloVisualizar">Estado</span>
          <span class="valorVisualizar">{{ pessoa.endereco.estado }}</span>
        </div>

        <div class="itemLinha">
          <span class="tituloVisualizar">Cidade</span>
          <span class="valorVisualizar">{{ pessoa.endereco.cidade }}</span>
        </div>

        <div class="itemLinha">
          <span class="tituloVisualizar">Bairro</span>
          <span class="valorVisualizar">{{ pessoa.endereco.bairro }}</span>
        </div>

        <div class="itemLinha">
          <span class="tituloVisualizar">Rua</span>
          <span class="valorVisualizar">{{ pessoa.endereco.rua }}</span>
        </div>

        <div class="itemLinha">
          <span class="tituloVisualizar">Número</span>
          <span class="valorVisualizar">{{ pessoa.endereco.numero }}</span>
        </div>
      </div>

      <!-- BOTÃO -->
      <div class="row justify-end q-mt-md">
        <q-btn label="Voltar" flat @click="$router.back()" />
      </div>

    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { PessoaService } from 'src/services/sgci-api-service'

const pessoaService = new PessoaService()

export default {
  name: 'ViewPessoa',

  setup () {
    const route = useRoute()

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

    const buscarPessoa = async () => {
      const id = route.params.id
      if (!id) return

      try {
        const { data } = await pessoaService.getById(id)
        pessoa.value = data
      } catch (err) {
        console.error('Erro ao buscar pessoa', err)
      }
    }

    const formatTipoPessoa = (tipo) => {
      if (tipo === 'PESSOA_FISICA') return 'Pessoa Física'
      if (tipo === 'PESSOA_JURIDICA') return 'Pessoa Jurídica'
      return ''
    }

    const formatEstadoCivil = (estado) => {
      if (estado === 'CASADO') return 'Casado'
      if (estado === 'SOLTEIRO') return 'Solteiro'
      if (estado === 'DIVORCIADO') return 'Divorciado'
      return ''
    }

    onMounted(() => {
      buscarPessoa()
    })

    return {
      pessoa,
      formatTipoPessoa,
      formatEstadoCivil
    }
  }
}
</script>

<style scoped>
.cardVisualizacao {
  background: #ffffff;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
}

.itemLinha {
  display: flex;
  flex-direction: column;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.itemLinha:last-child {
  border-bottom: none;
}

.tituloVisualizar {
  font-size: 11px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
}

.valorVisualizar {
  font-size: 15px;
  font-weight: 500;
  color: #111827;
}
</style>