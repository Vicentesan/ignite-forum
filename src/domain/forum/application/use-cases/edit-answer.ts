import { Answer } from '../../enterprise/entities/answer'
import { AnswerRepository } from '../repositories/answer-repository'

interface EditAnswerUseCaseProps {
  authorId: string
  answerId: string
  content: string
}

interface EditAnswerUseCaseResponse {
  success: boolean
  answer: Answer
}

export class EditAnswerUseCase {
  constructor(private answersRepository: AnswerRepository) {}

  async execute({
    authorId,
    answerId,
    content,
  }: EditAnswerUseCaseProps): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answersRepository.findById(answerId)

    if (!answer) throw new Error('Answer not found')

    if (answer.authorId.toString() !== authorId) throw new Error('Not allowed')

    answer.content = content

    await this.answersRepository.save(answer)

    return { success: true, answer }
  }
}
