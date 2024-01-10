import { QuestionsRepository } from '../repositories/question-repository'

interface DeleteQuestionUseCaseProps {
  authorId: string
  questionId: string
}

interface DeleteQuestionUseCaseResponse {
  success: boolean
  questionId: string
}

export class DeleteQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    questionId,
  }: DeleteQuestionUseCaseProps): Promise<DeleteQuestionUseCaseResponse> {
    const question = await this.questionsRepository.findById(questionId)

    if (!question) throw new Error('Question not found')

    if (authorId !== question.authorId.toString())
      throw new Error('Not allowed')

    await this.questionsRepository.delete(question)

    return { success: true, questionId: question.id.toString() }
  }
}
