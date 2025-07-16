// Import individual capability files
import businessCapabilities from './business-capabilities.json';
import applicationCapabilities from './application-capabilities.json';
import dataCapabilities from './data-capabilities.json';
import infrastructureCapabilities from './infrastructure-capabilities.json';
import securityCapabilities from './security-capabilities.json';

// Combine all capabilities into a single array
const capabilities = [
	businessCapabilities,
	applicationCapabilities,
	dataCapabilities,
	infrastructureCapabilities,
	securityCapabilities
];

// Export as default
export default capabilities;