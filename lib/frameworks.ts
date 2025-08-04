// Framework Templates for Structured Thinking

export interface FrameworkTemplate {
  id: string
  name: string
  description: string
  template: string
  category: 'problem-definition' | 'ideation' | 'user-research' | 'validation' | 'planning'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export const frameworkTemplates: FrameworkTemplate[] = [
  {
    id: 'empathy-map',
    name: 'Empathy Map',
    description: 'Understand your users deeply by mapping their thoughts, feelings, actions, and pain points',
    category: 'user-research',
    difficulty: 'beginner',
    template: `
## 🤝 Empathy Map: [User Persona Name]

| **THINKS & FEELS** | **SEES** |
|-------------------|----------|
| • What are their thoughts? | • What do they see in their environment? |
| • What emotions do they experience? | • What do they observe others doing? |
| • What worries them? | • What are they exposed to? |
| • What excites them? | • What problems do they encounter? |

| **SAYS & DOES** | **PAINS** |
|----------------|-----------|
| • What do they say publicly? | • What frustrates them? |
| • How do they behave? | • What obstacles do they face? |
| • What actions do they take? | • What risks do they fear? |
| • What's their attitude? | • What keeps them up at night? |

### **GAINS**
• What do they want to achieve?
• What would make them happy?
• How do they measure success?
• What would exceed their expectations?
`
  },
  {
    id: 'five-whys',
    name: '5 Whys Analysis',
    description: 'Dig deep to find the root cause of any problem through systematic questioning',
    category: 'problem-definition',
    difficulty: 'beginner',
    template: `
## 🔍 5 Whys Analysis

**Initial Problem Statement**: [Describe the problem you're investigating]

### Analysis Chain:
1. **Why does this problem occur?**
   Answer: [First level cause]

2. **Why does [first level cause] happen?**
   Answer: [Second level cause]

3. **Why does [second level cause] happen?**
   Answer: [Third level cause]

4. **Why does [third level cause] happen?**
   Answer: [Fourth level cause]

5. **Why does [fourth level cause] happen?**
   Answer: [Root cause - this is what we need to address]

### **Root Cause Identified**: 
[Summary of the true underlying issue]

### **Potential Solutions**:
• [Solution targeting root cause]
• [Alternative approach]
• [Preventive measure]
`
  },
  {
    id: 'scamper',
    name: 'SCAMPER Ideation',
    description: 'Generate creative solutions by systematically modifying existing ideas',
    category: 'ideation',
    difficulty: 'intermediate',
    template: `
## 🎯 SCAMPER Ideation Framework

**Base Concept**: [What are you trying to improve or innovate?]

### **S - SUBSTITUTE**
• What can be substituted or swapped?
• What other ingredients, materials, or components could work?
• What other processes or procedures could work?

**Ideas**: 
- [Substitution idea 1]
- [Substitution idea 2]

### **C - COMBINE**
• What can be combined or merged together?
• What if you combined purposes or functions?
• What could you combine to maximize uses?

**Ideas**:
- [Combination idea 1]
- [Combination idea 2]

### **A - ADAPT**
• What can be adapted from somewhere else?
• What else is like this? What could you copy?
• What could you adapt from other industries?

**Ideas**:
- [Adaptation idea 1]
- [Adaptation idea 2]

### **M - MODIFY/MAGNIFY**
• What can be emphasized, enlarged, or extended?
• What can be made stronger, bigger, or more frequent?
• What can be duplicated or multiplied?

**Ideas**:
- [Modification idea 1]
- [Modification idea 2]

### **P - PUT TO OTHER USE**
• How else can this be used?
• What other markets or applications exist?
• Who else could use this?

**Ideas**:
- [Alternative use 1]
- [Alternative use 2]

### **E - ELIMINATE**
• What can be removed, simplified, or reduced?
• What's unnecessary or redundant?
• What would happen if you removed a component?

**Ideas**:
- [Elimination idea 1]
- [Elimination idea 2]

### **R - REVERSE/REARRANGE**
• What can be reversed or rearranged?
• What if you changed the order or sequence?
• What if you flipped the problem?

**Ideas**:
- [Reversal idea 1]
- [Reversal idea 2]

### **🚀 Top 3 SCAMPER Ideas**:
1. [Best idea with brief explanation]
2. [Second best idea with brief explanation]
3. [Third best idea with brief explanation]
`
  },
  {
    id: 'lean-canvas',
    name: 'Lean Canvas',
    description: 'Validate your business model on a single page',
    category: 'validation',
    difficulty: 'advanced',
    template: `
## 📋 Lean Canvas

| **PROBLEM** | **SOLUTION** | **UNIQUE VALUE PROPOSITION** | **UNFAIR ADVANTAGE** | **CUSTOMER SEGMENTS** |
|-------------|--------------|------------------------------|----------------------|----------------------|
| Top 3 problems | Top 3 features | Single, clear message | Can't be copied | Target customers |
| | | | | |
| Existing alternatives | | High-level concept | | Early adopters |

| **KEY METRICS** | **CHANNELS** |
|-----------------|--------------|
| Key numbers that tell you how you're doing | Path to customers |

| **COST STRUCTURE** | **REVENUE STREAMS** |
|-------------------|-------------------|
| Customer acquisition costs | Revenue model |
| Distribution costs | Life time value |
| Hosting, people, etc. | Revenue, gross margin |

### **Key Questions to Answer**:
1. **Problem**: Do you have a problem worth solving?
2. **Customer Segments**: Do you know your customer?
3. **Unique Value Proposition**: Do you have a clear message?
4. **Solution**: Does your solution solve the problem?
5. **Channels**: Do you know how to reach customers?
6. **Revenue Streams**: Do you have a viable business model?
7. **Cost Structure**: Do the numbers add up?
8. **Key Metrics**: Do you know what to measure?
9. **Unfair Advantage**: Do you have something others can't copy?
`
  },
  {
    id: 'user-journey',
    name: 'User Journey Map',
    description: 'Map the complete user experience from awareness to advocacy',
    category: 'user-research',
    difficulty: 'intermediate',
    template: `
## 🗺️ User Journey Map: [User Persona]

**Scenario**: [Specific use case or goal]

### Journey Stages

| Stage | **AWARENESS** | **CONSIDERATION** | **PURCHASE** | **ONBOARDING** | **USAGE** | **ADVOCACY** |
|-------|---------------|-------------------|--------------|----------------|-----------|--------------|
| **User Actions** | What they do | What they do | What they do | What they do | What they do | What they do |
| **Touchpoints** | Where they interact | Where they interact | Where they interact | Where they interact | Where they interact | Where they interact |
| **Thoughts** | What they think | What they think | What they think | What they think | What they think | What they think |
| **Emotions** | 😐😊😢😡 | 😐😊😢😡 | 😐😊😢😡 | 😐😊😢😡 | 😐😊😢😡 | 😐😊😢😡 |
| **Pain Points** | What frustrates them | What frustrates them | What frustrates them | What frustrates them | What frustrates them | What frustrates them |
| **Opportunities** | How to improve | How to improve | How to improve | How to improve | How to improve | How to improve |

### **Key Insights**:
• **Biggest Pain Points**: [List top 3]
• **Emotional Highs**: [When users feel best]
• **Emotional Lows**: [When users feel worst]
• **Drop-off Risks**: [Where users might leave]

### **Improvement Opportunities**:
1. [Opportunity 1 with impact]
2. [Opportunity 2 with impact]
3. [Opportunity 3 with impact]
`
  },
  {
    id: 'ice-scoring',
    name: 'ICE Prioritization',
    description: 'Prioritize ideas based on Impact, Confidence, and Ease of implementation',
    category: 'validation',
    difficulty: 'beginner',
    template: `
## 📊 ICE Scoring Matrix

**Instructions**: Rate each idea from 1-10 for Impact, Confidence, and Ease. ICE Score = (Impact × Confidence × Ease) / 100

| **Idea** | **Impact** (1-10) | **Confidence** (1-10) | **Ease** (1-10) | **ICE Score** | **Priority** |
|----------|-------------------|----------------------|------------------|---------------|--------------|
| [Idea 1] | [Rating] | [Rating] | [Rating] | [Calculated] | [High/Med/Low] |
| [Idea 2] | [Rating] | [Rating] | [Rating] | [Calculated] | [High/Med/Low] |
| [Idea 3] | [Rating] | [Rating] | [Rating] | [Calculated] | [High/Med/Low] |
| [Idea 4] | [Rating] | [Rating] | [Rating] | [Calculated] | [High/Med/Low] |

### **Scoring Guidelines**:

**Impact (1-10)**:
- 1-3: Low impact on key metrics
- 4-6: Moderate impact on key metrics  
- 7-10: High impact on key metrics

**Confidence (1-10)**:
- 1-3: Low confidence this will work
- 4-6: Moderate confidence with some evidence
- 7-10: High confidence with strong evidence

**Ease (1-10)**:
- 1-3: Very difficult/expensive to implement
- 4-6: Moderate effort required
- 7-10: Easy/cheap to implement

### **Prioritized Action Plan**:
1. **Quick Wins** (High ICE, Easy): [List ideas]
2. **Big Bets** (High ICE, Hard): [List ideas]
3. **Fill-ins** (Low ICE, Easy): [List ideas]
4. **Questionable** (Low ICE, Hard): [Consider dropping]
`
  }
]

// Helper function to get framework by ID
export const getFramework = (id: string): FrameworkTemplate | undefined => {
  return frameworkTemplates.find(framework => framework.id === id)
}

// Helper function to get frameworks by category
export const getFrameworksByCategory = (category: FrameworkTemplate['category']): FrameworkTemplate[] => {
  return frameworkTemplates.filter(framework => framework.category === category)
}

// Helper function to suggest framework based on user input
export const suggestFramework = (userInput: string, domain: string): FrameworkTemplate | null => {
  const input = userInput.toLowerCase()
  
  // Problem definition keywords
  if (input.includes('problem') || input.includes('why') || input.includes('root cause')) {
    return getFramework('five-whys') || null
  }
  
  // User research keywords
  if (input.includes('user') || input.includes('customer') || input.includes('persona')) {
    return getFramework('empathy-map') || null
  }
  
  // Ideation keywords
  if (input.includes('idea') || input.includes('solution') || input.includes('creative')) {
    return getFramework('scamper') || null
  }
  
  // Validation keywords
  if (input.includes('prioritize') || input.includes('validate') || input.includes('business model')) {
    return domain === 'startup' ? (getFramework('lean-canvas') || null) : (getFramework('ice-scoring') || null)
  }
  
  // Journey mapping keywords
  if (input.includes('journey') || input.includes('experience') || input.includes('touchpoint')) {
    return getFramework('user-journey') || null
  }
  
  return null
}