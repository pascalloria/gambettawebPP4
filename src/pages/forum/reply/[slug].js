import PostBody from '../../../../components/PostBody/PostBody';
import { getSession } from 'next-auth/react';

const addReply = (props) => {
  return <PostBody mode="reply" slug={props.slug} author={props.user.name}></PostBody>;
};

export default addReply;

export async function getServerSideProps(context) {
  let { params } = context;
  let user = null;
  const session = await getSession({ req: context.req });
  if (session) {
    user = session.user;
  }

  return {
    props: {
      slug: params.slug,
      user: user,
    },
  };
}
