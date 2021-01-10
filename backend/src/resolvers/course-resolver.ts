import {Arg, Ctx, Int, Mutation, Query, Resolver} from "type-graphql";
import {CourseEntity} from "../models/course-entity";
import {MyContext} from "../types/graphql-types";

@Resolver()
export class CourseResolver {

  @Query(() => [CourseEntity])
  courses(
    @Ctx() {em}: MyContext
  ): Promise<CourseEntity[]> {
    return em.find(CourseEntity, {});
  }

  @Query(() => CourseEntity, {nullable: true})
  course(
    @Arg("id", () => Int) id: number,
    @Ctx() {em}: MyContext
  ): Promise<CourseEntity | null> {
    return em.findOne(CourseEntity, {id});
  }

  @Mutation(() => CourseEntity)
  async createCourse(
    @Arg("title", () => String) title: string,
    @Ctx() {em}: MyContext
  ): Promise<CourseEntity> {
    const course = em.create(CourseEntity, {title});
    await em.persistAndFlush(course);

    return course;
  }

  @Mutation(()=> CourseEntity, {nullable: true})
  async updateCourse(
    @Arg("id", ()=> Int) id: number,
    @Arg("title", ()=> String) title: string,
    @Ctx() {em}: MyContext
  ): Promise<CourseEntity | null> {
    const course = await em.findOne(CourseEntity, {id});

    if (!course) return null;

    if (typeof title !== undefined) {
      course.title = title;
      await em.persistAndFlush(course);

      return course;
    }

    return null;
  }

  @Mutation(()=> Boolean)
  async deleteCourse(
    @Arg("id", ()=> Int) id: number,
    @Ctx() {em}: MyContext
  ) : Promise<boolean> {
    const course = await em.findOne(CourseEntity, {id});

    if (course) {
      await em.nativeDelete(CourseEntity, {id});
      return true;
    }

    return false;
  }
}
