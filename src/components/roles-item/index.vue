<script>
  import store from '@/store'
  export default {
    name: 'roles',
    methods: {
      setRoles(roleName) {
        return store.getters.roles.map(v => v.match).includes(roleName);
      }
    }
  }
</script>
