export const ToneParams = {
  Tone: [
    'Formal',
    'Informal',
    'Sarcastic',
    'Polite',
    'Humorous',
    'Serious',
    'Professional',
    'Friendly',
    'Presuasive',
    'Empathic',
    'Condescending',
  ],
};

export const StyleParams = {
  Style: ['Academic', 'Technical', 'Creative', 'Descriptive', 'Persuasive'],
};

export const TargetAudienceParams = {
  'Target audience': [
    'Children',
    'Teenagers',
    'Adults',
    'Seniors',
    'Professinals',
    'Experts',
  ],
};

export const LengthParams = {
  Length: ['Short', 'Medium', 'Long', 'Very long'],
};

export const PurposeParams = {
  Purpose: ['Article', 'Blog post', 'Research paper', 'Speech', 'Email'],
};

export const GrammerAndPunctuationParams = {
  'Grammer and punctuation': [
    'American Eng',
    'British Eng',
    'Australian Eng',
    'Indian Eng',
    'Chinese Eng',
  ],
};

export const FocusOnParams = {
  'Focus on': ['Main idea', 'Key arguments', 'Important details'],
};

export const PerspectiveParams = {
  Perspective: ['First person', 'Second person', 'Third person'],
};

export const DetailLevelParams = {
  'Detail Level': ['High level', 'Intermediate', 'Detailed'],
};

export const OutputLanguageParams = {
  'Output language': [
    'English',
    'Spanish',
    'French',
    'German',
    'Italian',
    'Portuguese',
    'Dutch',
    'Russian',
    'Arabic',
    'Japanese',
    'Chinese',
    'Korean',
    'Turkish',
    'Swedish',
    'Danish',
    'Norwegian',
    'Finnish',
    'Polish',
    'Czech',
    'Hungarian',
    'Greek',
    'Thai',
    'Vietnamese',
    'Indonesian',
    'Malay',
  ],
};

export const GeneralParamGroup = {
  ...ToneParams,
  ...StyleParams,
  ...TargetAudienceParams,
  ...LengthParams,
  ...PurposeParams,
  ...GrammerAndPunctuationParams,
};
