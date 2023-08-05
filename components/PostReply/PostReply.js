import { Parser } from 'html-to-react';

const PostReply = (props) => {
  // variable

  
  const htmlParser = new Parser();
  let replys = props.replys;
  let replyShow;

  replyShow = replys.map((reply, i) => (
   
    <li key={i}>
      <div className="bg-white p-3 ms-8 border-b-2 border-dotted border-primary">
        <div>{htmlParser.parse(reply.content)}</div>
        <div className="flex mt-2 text-sm gap-2 justify-end">
          <span className="font-medium">{reply.author}</span>
          {/* date en version FR */}
          <span>le {new Date(reply.dateCreate).toLocaleDateString('fr')}</span>
        </div>
      </div>
    </li>
  ));

  return <ul>{replyShow}</ul>;
};

export default PostReply;
