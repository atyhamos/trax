export const levelOrderMap = new Map([
  ['K1', 0],
  ['K2', 1],
  ['P1', 2],
  ['P2', 3],
  ['P3', 4],
  ['P4', 5],
  ['P5', 6],
  ['P6', 7],
  ['S1', 8],
  ['S2', 9],
  ['S3', 10],
  ['S4', 11],
])

export const ascLevelOrder = (student1, student2) => {
  if (student2) return student1.level.localeCompare(student2.level)
}

export const descLevelOrder = (student1, student2) => {
  if (student2) return student2.level.localeCompare(student1.level)
}

export const ascNameOrder = (student1, student2) => {
  if (student2) return student1.name.localeCompare(student2.name)
}

export const descNameOrder = (student1, student2) => {
  if (student2) return student2.name.localeCompare(student1.name)
}
