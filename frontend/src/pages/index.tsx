import NavBar from "../components/NavBar";
import {createUrqlClient} from "../utils/createUrqlClient";
import {withUrqlClient} from "next-urql";
import {useCoursesQuery} from "../generated/graphql";

const Index = () => {
  const [{data}] = useCoursesQuery();

  return (
    <>
      <NavBar/>
      <div>Hello World</div>

      <br/>

      {!data ? <div>Loading...</div> : data.courses.map((c) => <div key={c.id}>{c.title}</div>)}

    </>
  );
}

export default withUrqlClient(createUrqlClient, {ssr: true})(Index);
