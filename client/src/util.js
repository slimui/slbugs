/*
	turns { id: { key: value, key2: value2 } }
	into { key:value, key2: value2, id:id }
	instead of chaining lodash methods
*/

export const reshapeData = data => {
	return Object.values(data).map((values, i) => {
		return { ...values, id: Object.keys(data)[i] }
	})
}
