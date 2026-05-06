const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue'),
      },

      {
        path: 'pessoas/form',
        component: () => import('pages/pessoas/CreateEditPessoa.vue'),
      },

      {
        path: 'pessoas/form/:id',
        component: () => import('pages/pessoas/CreateEditPessoa.vue'),
      },
    ],
  },

  // rota de fallback (404)
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
