import PostBody from '../../../../components/PostBody/PostBody';
import { getSession, signIn } from 'next-auth/react';

const AjouterPost = (props) => {

    
  return <PostBody mode="post" type={props.type} author={props.user.name} />;
};

export default AjouterPost;

export async function getServerSideProps(context) {
  let { params } = context;
  let user = null;
  const session = await getSession({ req: context.req });
  if (session) {
    user = session.user;
  }

  return {
    props: {
      type: params.type,
      user: user
    },
  };
}
