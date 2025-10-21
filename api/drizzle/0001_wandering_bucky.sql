ALTER TABLE "user_question_answers" ALTER COLUMN "question_selection_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "user_question_answers" ADD COLUMN "answer" text;