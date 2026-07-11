# Well Wallet

Financial Management Application built with Java and Maven.

## Overview

Well Wallet is a Java-based financial management application designed to help users manage their finances effectively.

## Prerequisites

- Java 11 or higher
- Maven 3.6.0 or higher
- Git

## Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/duane80cauchi-lang/Well-wallet-.git
cd Well-wallet-
```

### 2. Configure Maven
See [MAVEN_SETUP.md](docs/MAVEN_SETUP.md) for detailed setup instructions.

### 3. Build the Project
```bash
mvn clean package
```

### 4. Run Tests
```bash
mvn test
```

### 5. Publish to GitHub Packages
```bash
mvn deploy
```

## Project Structure

```
Well-wallet-/
├── src/
│   ├── main/
│   │   ├── java/             # Main source code
│   │   └── resources/        # Configuration files
│   └── test/
│       ├── java/             # Test code
│       └── resources/        # Test configuration
├── pom.xml                   # Maven project configuration
├── .github/
│   └── workflows/
│       └── publish.yml       # CI/CD workflow
└── docs/
    └── MAVEN_SETUP.md        # Maven setup guide
```

## Maven Commands

| Command | Description |
|---------|-------------|
| `mvn clean package` | Build the project |
| `mvn test` | Run all tests |
| `mvn clean package -DskipTests` | Build without tests |
| `mvn deploy` | Publish to GitHub Packages |
| `mvn javadoc:javadoc` | Generate Javadoc |

## Dependencies

- **JUnit 4.13.2** — Unit testing
- **SLF4J 1.7.36** — Logging API
- **Logback 1.2.11** — Logging implementation
- **Gson 2.10.1** — JSON processing

## Publishing to GitHub Packages

The project automatically publishes to GitHub Packages when changes are pushed to the `main` branch via GitHub Actions.

For manual publishing:
```bash
mvn deploy
```

Ensure your `~/.m2/settings.xml` is configured with your Personal Access Token. See [MAVEN_SETUP.md](docs/MAVEN_SETUP.md) for details.

## Using This Package

To use Well Wallet as a dependency in another Maven project:

1. Add to your `pom.xml`:
```xml
<repositories>
  <repository>
    <id>github</id>
    <url>https://maven.pkg.github.com/duane80cauchi-lang/Well-wallet-</url>
  </repository>
</repositories>

<dependencies>
  <dependency>
    <groupId>com.wellwallet</groupId>
    <artifactId>well-wallet</artifactId>
    <version>1.0.0-SNAPSHOT</version>
  </dependency>
</dependencies>
```

2. Configure your `~/.m2/settings.xml` with GitHub authentication.

## Documentation

- [Maven Setup Guide](docs/MAVEN_SETUP.md) — Detailed Maven configuration and troubleshooting
- [GitHub Packages](https://docs.github.com/en/packages)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a Pull Request

## License

This project is open source and available under the MIT License.

## Support

For issues and questions, please use the [GitHub Issues](https://github.com/duane80cauchi-lang/Well-wallet-/issues) page.
