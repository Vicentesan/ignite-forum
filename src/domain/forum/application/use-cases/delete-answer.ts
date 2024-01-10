import { AnswerRepository } from '../repositories/answer-repository'

interface DeleteAnswerUseCaseProps {
  authorId: string
  answerId: string
}

interface DeleteAnswerUseCaseResponse {
  success: boolean
  answerId: string
}

export class DeleteAnswerUseCase {
  constructor(private answersRepository: AnswerRepository) {}

  async execute({
    authorId,
    answerId,
  }: DeleteAnswerUseCaseProps): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) throw new Error('Answer not found')

    if (authorId !== answer.authorId.toString()) throw new Error('Not allowed')

    await this.answersRepository.delete(answer)

    return { success: true, answerId: answer.id.toString() }
  }
}
