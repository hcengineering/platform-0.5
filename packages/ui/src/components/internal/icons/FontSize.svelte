<script lang="ts">
  import IconSize from '../../IconSize.svelte'
  export let size: 'small' | 'medium' | 'large'
  const fill: string = 'var(--theme-caption-color)'
</script>

<IconSize {size}>
  <svg {fill} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <g>
      <path d="M3.7,3.4l-3.1,9.1h1.3l0.9-2.6h3.5l0.9,2.6h1.3L5.3,3.4H3.7z M3,8.8l1.4-4.2h0.1L6,8.8H3z"/>
      <path d="M14.7,11.4V7.9c0-0.7-0.2-1.3-0.7-1.7c-0.5-0.4-1.1-0.6-2-0.6c-0.6,0-1.1,0.1-1.5,0.4c-0.4,0.3-0.7,0.6-0.9,0.9l0.7,0.7 C10.5,7.3,10.7,7,11,6.8c0.3-0.2,0.6-0.3,1-0.3c0.5,0,0.9,0.1,1.1,0.4c0.2,0.2,0.4,0.6,0.4,1v0.6h-1.3c-1,0-1.7,0.2-2.2,0.5 c-0.5,0.3-0.7,0.8-0.7,1.5c0,0.6,0.2,1.1,0.6,1.5c0.4,0.4,0.9,0.5,1.6,0.5c0.5,0,0.9-0.1,1.2-0.3s0.6-0.5,0.7-0.9h0.1 c0,0.3,0.2,0.6,0.3,0.8c0.2,0.2,0.5,0.3,0.8,0.3h0.7v-1H14.7z M13.4,10.5c0,0.3-0.2,0.6-0.5,0.8c-0.3,0.2-0.7,0.3-1.2,0.3 c-0.4,0-0.7-0.1-0.9-0.3s-0.3-0.4-0.3-0.7v-0.3c0-0.3,0.1-0.6,0.4-0.7c0.3-0.2,0.7-0.2,1.2-0.2h1.3V10.5z"/>
    </g>
  </svg>
</IconSize>
