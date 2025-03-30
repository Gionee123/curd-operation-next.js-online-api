// import Course_add from "";
// import Course_add from "./course_add/[...id]/page";
// import Course_add from "./course_add/page";
// import Course_add from "./course_add/page";
// import Course_add from "./course_add/[...id]/page";
// import Course_add from "./course_add/[...id].js/page";
// import Course_add from "./course_add/page";
import Course_add from "./course_add/page";
import Course_view from "./course_view/page";


export default function Home() {
  return (
    <>
      <h1>home</h1>
      <Course_add />
      <Course_view />

    </>
  );
}
