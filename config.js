export const config = {
    // Navigation sections
    sections: [
        { id: 'intro', title: 'Introduction' },
        { id: 'product', title: 'Product Showcase' },
        { id: 'data', title: 'Data & Charts' },
        { id: 'comparison', title: 'Comparisons' },
        { id: 'testimonials', title: 'Testimonials' }
    ],
    
    // Brand colors
    colors: {
        primary: '#74f9d1',
        secondary: '#356252', 
        neutral: '#2F3132',
        background: '#F5F5F5',
        backgroundAlt: '#FFFFFF'
    },
    
    // Typography scale (in pixels)
    typography: {
        headingLarge: 44,  // Main headlines
        headingMedium: 32, // Subheadings
        textRegular: 24,   // Body text
        textSmall: 18      // Supporting text
    },
    
    // Layout settings
    layout: {
        maxLinesPerSlide: 6,
        maxWordsPerLine: 6,
        marginPercentage: 10, // 10% margins
        aspectRatio: '16/9'   // Widescreen format
    },
    
    // Content guidelines
    guidelines: {
        productShowcase: {
            focusPoints: 1,        // One key feature per slide
            backgroundContrast: 'high'
        },
        dataVisualization: {
            maxDataPoints: 6,
            preferredChartTypes: ['bar', 'line', 'pie']
        }
    },
    
    // Presentation settings
    presentation: {
        autoAdvance: 0,  // Set to milliseconds if auto-advance is desired (0 = disabled)
        transitionSpeed: 500 // milliseconds
    }
};