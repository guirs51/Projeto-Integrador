import app from './app'
import { appDataSource } from './data-source'

const PORT = process.env.PORT || 3000

appDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))
  })
  .catch(err => console.error('Erro ao conectar no banco:', err))