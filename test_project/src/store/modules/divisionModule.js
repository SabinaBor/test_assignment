import axios from 'axios';

const state = {
    divisions: [],
};

const getters = {
    divList: state => state.divisions,
    currentArray(state, name) {
        for (let division of state.divisions){
            if(division.name === name){
                return state.divisions
            } else {
                return this.currentArray(division, name)
            }
        }
    }
};

const actions = {
    async fetchDivisions({commit}){
        const response = await axios.get("http://localhost:3000/divisions");
        commit("setDivisions", response.data)
    },
    async addDivisions({commit}, division){
        console.log(division);
        const response = await axios.post("http://localhost:3000/divisions", division);
        commit("addNewDivision", response.data)
    },
    async deleteDivision({commit}, id){
        console.log(id);
        await axios.delete(`http://localhost:3000/divisions/${id}`);
        commit("removeDivision", id);
    }
};

const mutations = {
    setDivisions: (state, divisions) => (
        state.divisions = divisions
    ),
    addNewDivision: (state, division) => state.divisions.unshift(division),
    removeDivision: (state, id) => (
        state.divisions.filter(division => division.id !== id),
        state.divisions.splice(division => division.id, 1)
    )
};

export default {
    state,
    getters,
    actions,
    mutations
}