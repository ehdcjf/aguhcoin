import CommentLayout from "./CommentLayout";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import CommentInfo from "./CommentInfo";
const Comment = ({board_id}) => {
  return (
    <CommentLayout>
      <CommentInfo/>
      <CommentForm root={0} />
      <CommentList root={0} />
    </CommentLayout>
  );
};

export default Comment;
