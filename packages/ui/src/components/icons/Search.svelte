<script lang="ts">
  import IconSize from '../IconSize.svelte'
  export let size: 'small' | 'medium' | 'large'
  const fill: string = 'var(--theme-caption-color)'
</script>

<IconSize {size}>
  <svg {fill} viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.4,13.6L11.7,11c0.8-1,1.3-2.2,1.3-3.5c0-3-2.5-5.5-5.5-5.5C4.5,2,2,4.5,2,7.5c0,3,2.5,5.5,5.5,5.5 c1.3,0,2.6-0.5,3.5-1.3l2.6,2.6c0.2,0.2,0.5,0.2,0.7,0C14.5,14.2,14.5,13.8,14.4,13.6z M3,7.5C3,5,5,3,7.5,3S12,5,12,7.5 S10,12,7.5,12S3,10,3,7.5z"/>
  </svg>
</IconSize>
