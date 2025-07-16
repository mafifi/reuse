import { rehypeMermaid } from 'rehype-mermaid'

export default {
  extensions: ['.svx'],
  rehypePlugins: [
    [rehypeMermaid, {
      theme: 'dark',
      themeVariables: {
        primaryColor: '#0891b2', // watercourse color
        primaryTextColor: '#fff',
        primaryBorderColor: '#0891b2',
        lineColor: '#374151',
        sectionBkgColor: '#1f2937',
        altSectionBkgColor: '#111827',
        gridColor: '#374151',
        secondaryColor: '#6366f1',
        tertiaryColor: '#ec4899'
      }
    }]
  ]
}