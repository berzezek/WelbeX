<template>
    <table id="table">
      <tr>
        <th>{{ table.date }}</th>
        <th>{{ table.title }}</th>
        <th>{{ table.quantity }}</th>
        <th>{{ table.distance }}</th>
      </tr>
    </table>
</template>

<script>

export default {
  name: 'Table',
  data() {
    return {
      table: {
        date: 'date',
        title: 'title',
        quantity: 'quantity',
        distance: 'distance',
      },
      exam: [
        
      ]
    }
  }
}
</script>

<style>

#table {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 20px;
  margin-left: 5%;
  width: 90%;
  table-layout: fixed;
  border: 1px solid black;
  text-transform: capitalize;
}

td {
  width: 100%;
}

</style>
