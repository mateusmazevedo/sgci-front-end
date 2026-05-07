import axios from 'axios'

const apiSgci = axios.create({
  baseURL: import.meta.env.VITE_API_SGCI || 'http://localhost:8080/v1/api'
})

export class PessoaService {
  path = '/pessoas'

  create (pessoa) {
    return apiSgci.post(this.path, pessoa)
  }

  update (id, pessoa) {
    return apiSgci.put(`${this.path}/${id}`, pessoa)
  }

  getById (id) {
    return apiSgci.get(`${this.path}/${id}`)
  }

  findAll (params) {
    return apiSgci.get(this.path, { params })
  }

  delete (id) {
    return apiSgci.delete(`${this.path}/${id}`)
  }

  exportar () {
    return apiSgci.get(`${this.path}/exportar-csv`, {
      responseType: 'blob'
    })
  }
}

export const pessoaService = new PessoaService()