export default interface DietGroupInstance {
  id: number,
  recipes: any[],
  title: string,
  image: string,
  desc: string,
  prohibits: string,
  percentage: number,
  membership: string[]
}
export default interface DietArray {
  [key: number]: DietGroupInstance;
}
