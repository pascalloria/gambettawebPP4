import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { Parser } from 'html-to-react';

const PostReply = (props) => {
  // variable

  const htmlParser = new Parser();
  const router = useRouter();
  let replys = props.replys;
  let replyShow;

  // Function

  const deleteReplyHandler = async (index) => {
    let params = {
      slug: props.slug,
      i: index,
    };

    const response = await fetch('/api/reply', {
      method: 'PUT',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    const data = await response.json();
    if (!response.ok) {
      console.log(data.message || 'Une erreur est survenue');
    } else {
      console.log(data.message)
      router.replace('/forum/' + props.slug);
    }
  };

  replyShow = replys.map((reply, i) => (
    reply &&
    <li key={i}>
      <div className="bg-white p-3 ms-8 border-b-2 border-dotted border-primary">
        <div>{htmlParser.parse(reply.content)}</div>
        <div className="flex mt-2 text-sm gap-2 justify-end">
          <span className="font-medium">{reply.author}</span>
          {/* date en version FR */}
          <span>le {new Date(reply.dateCreate).toLocaleDateString('fr')}</span>
          <button
            className="bg-quartary hover:bg-tertiaire  hover:text-white px-1  rounded"
            onClick={() => deleteReplyHandler(i)}
          >
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      </div>
    </li>
  ));

  return <ul>{replyShow}</ul>;
};

export default PostReply;
