import { Question } from '../../enterprise/entities/question'
import { QuestionRepository } from '../repositories/question-repository'
import { CreateQuestionUseCase } from './create-question'

const fakeQuestionRepository: QuestionRepository = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  create: async (question: Question) => {},
}

it('should be able to create an question', async () => {
  const createQuestion = new CreateQuestionUseCase(fakeQuestionRepository)

  const { question } = await createQuestion.execute({
    authorId: '1',
    title: 'Nova pergunta',
    content: 'Conteudo da pergunta',
  })

  expect(question.id).toBeTruthy()
})
