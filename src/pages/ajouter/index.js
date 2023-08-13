import ArticleBody from '../../../components/ArticleBody/ArticleBody';
import { getSession } from 'next-auth/react';

const Ajouter = (props) => {
  return <ArticleBody mode="Ajouter" user={props.user} />;
};

export default Ajouter;

export async function getServerSideProps(context) {
  let user = null;
  const session = await getSession({ req: context.req });
  if (session) {
    user = session.user;
  }

  return {
    props: {
      user: user,
    },
  };
}
