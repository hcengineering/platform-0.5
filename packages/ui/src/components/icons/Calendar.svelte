<script lang="ts">
  import IconSize from '../IconSize.svelte'
  export let size: 'small' | 'medium' | 'large'
  const fill: string = 'var(--theme-caption-color)'
</script>

<IconSize {size}>
  <svg {fill} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19.5,5h-2.1V4.5c0-0.3-0.2-0.5-0.5-0.5s-0.5,0.2-0.5,0.5V5H8.1V4.5C8.1,4.2,7.9,4,7.6,4S7.1,4.2,7.1,4.5V5H5 C4.2,5,3.5,5.7,3.5,6.5V19c0,0.8,0.7,1.5,1.5,1.5h14.5c0.8,0,1.5-0.7,1.5-1.5V6.5C21,5.7,20.3,5,19.5,5z M5,6h2.1v0.5 c0,0.3,0.2,0.5,0.5,0.5s0.5-0.2,0.5-0.5V6h8.3v0.5c0,0.3,0.2,0.5,0.5,0.5s0.5-0.2,0.5-0.5V6h2.1C19.7,6,20,6.3,20,6.5v3.1H4.5V6.5 C4.5,6.3,4.7,6,5,6z M19.5,19.5H5c-0.3,0-0.5-0.2-0.5-0.5v-8.3H20V19C20,19.2,19.7,19.5,19.5,19.5z"
    />
  </svg>
</IconSize>
