import PostBody from '../../../../components/PostBody/PostBody';
import { connectToDatabase } from '@/helpers/mongoBD';


const addReply = (props) => {
  return <PostBody mode="edit"  post={props.post} ></PostBody>;
};

export default addReply;

export async function getServerSideProps(context) {
    let posts;
    let { params } = context;
  
    try {
      // Connextion a MongoDB
      const client = await connectToDatabase();
      const db = client.db();
  
      // recuperer l'article a partir de son slug
      posts = await db.collection('Forum').find({ slug: params.slug }).toArray();
      console.log(posts)
    } catch (error) {
      posts = [];
  
      console.log(error);
    }
  
    return {
      props: {
        post: JSON.parse(JSON.stringify(posts[0])),
      },
    };
  }
  