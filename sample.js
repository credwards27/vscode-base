/**
 * @file syntax-test.js
 * @description Comprehensive JavaScript syntax highlighting test file.
 * @version 1.2.0
 */

// 1. Imports and Modules
import { EventEmitter } from 'events';
import * as path from 'path';
import defaultExporter, { secondaryUnit as renamedUnit } from './utils.js';

// 2. Constants and Global Variables
const CONFIG_KEY = Symbol('app.config');
let globalCounter = 0;
var legacyFlag = true;

window.console.log("hello world");

console.log();

/*
  Multi-line block comment:
  Testing numbers, booleans, and null values.
*/
const primitives = {
  integer: 42,
  float: 3.14159,
  hex: 0xFF,
  binary: 0b1010,
  bigInt: 9007199254740991n,
  booleanTrue: true,
  booleanFalse: false,
  empty: null,
  missing: undefined,
};

// 3. Classes and Advanced Object-Oriented Syntax
export class SyntaxHighlighterTest extends EventEmitter {
  #privateField = 'secured'; // Private field
  static instanceCount = 0;   // Static properties

  constructor(name = 'Tester', options = {}) {
    super();
    this.name = name;
    this.options = { timeout: 5000, ...options };
    SyntaxHighlighterTest.instanceCount++;
  }

  // Getter / Setter
  get status() {
    return `Active instance: ${this.#privateField}`;
  }

  /**
   * Async method with error handling
   * @param {string} url
   */
  async fetchData(url) {
    if (!url) {
      throw new Error('URL is missing!');
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      this.emit('success', data);
      return data;
    } catch (error) {
      console.error(`Execution failed: ${error.message}`);
      this.emit('error', error);
    } finally {
      globalCounter++;
    }
  }
}

// 4. Regular Expressions and Template Literals
const validationRules = {
  emailRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gim,
  escapedChars: /\n|\r|\t|\\/g,
};

function generateTemplate(user, role) {
  // Multiline template literal with embedded expressions and escapes
  return `
    <div class="user-card">
      <h2>Hello, ${user.toUpperCase()}!</h2>
      <p>Role: <strong>${role ?? 'Guest'}</strong></p>
      <p>Timestamp: ${new Date().toISOString()}</p>
      <p>Escaped Backtick: \` </p>
    </div>
  `;
}

// 5. Modern Operators and Control Flow
function processData(items) {
  // Optional chaining and Nullish coalescing
  const firstItemName = items?.?.name ?? 'Anonymous';
  
  // Destructuring and Rest/Spread operators
  const [prime, ...restItems] = items || [];
  const updatedConfig = { ...primitives, version: '2.0' };

  // Loop constructs
  for (const item of restItems) {
    if (item.score >= 90) {
      console.log(`High score found: ${item.score}`);
    } else if (item.score === 0) {
      continue;
    } else {
      break;
    }
  }

  // Switch statement
  switch (typeof firstItemName) {
    case 'string':
      return firstItemName.trim();
    case 'number':
      return String(firstItemName);
    default:
      return 'Unknown Type';
  }
}

if (globalCounter instanceof Array) {
}

// 6. Arrow Functions, Generators, and Closures
const inlineArrow = (a, b) => a * b;

const complexClosure = (factor) => {
  return (value) => value * factor;
};

// Generator function
function* idGenerator() {
  let id = 1;
  while (true) {
    yield `id_${id++}`;
  }
}

// 7. Execution Context
(() => {
  const gen = idGenerator();
  const double = complexClosure(2);
  
  const sampleItems = [
    { name: 'Alpha', score: 95 },
    { name: 'Beta', score: 40 }
  ];

  const processed = processData(sampleItems);
  console.log(`Result: ${processed} | Multiplied: ${double(5)}`);
  console.log(`Generated ID: ${gen.next().value}`);
})();

// 8. Class Instantiation (Custom and Built-In)
(async () => {
  // A. Instantiating a custom class
  const highlighterInstance = new SyntaxHighlighterTest('CodeLover', { timeout: 3000 });
  console.log(`Custom Instance Status: ${highlighterInstance.status}`);

  // B. Instantiating built-in standard classes
  const activeUsersMap = new Map([['id_1', 'Alice'], ['id_2', 'Bob']]);
  const uniqueTagsSet = new Set(['javascript', 'syntax', 'web']);
  const currentTimestamp = new Date();
  
  // Instantiating a regular expression class constructor dynamically
  const patternMatch = new RegExp('\\b(test|syntax)\\b', 'gi');

  // Instantiating a built-in Promise class object
  const delayedGreeting = new Promise((resolve) => {
    setTimeout(() => resolve('Hello from a native Promise!'), 100);
  });

  // Verify behavior of built-in instances
  if (uniqueTagsSet.has('javascript') && activeUsersMap.size > 0) {
    const diagnosticTime = currentTimestamp.toISOString();
    console.log(`Tested built-ins at ${diagnosticTime} with pattern: ${patternMatch.source}`);
    console.log(await delayedGreeting);
  }

  // Triggering the asynchronous custom class method
  await highlighterInstance.fetchData('https://example.com');
})();
