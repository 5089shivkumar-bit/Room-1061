import ngrok from 'ngrok';
import chalk from 'chalk';

const PORT = 5173;

async function startNgrok() {
    try {
        console.log(chalk.cyan('\n🚀 Starting ngrok tunnel...'));

        const url = await ngrok.connect({
            addr: PORT,
            proto: 'http',
        });

        console.log(chalk.green('✅ ngrok tunnel is active!'));
        console.log(chalk.yellow('📱 Public Mobile URL: ') + chalk.bold.underline.blue(url));
        console.log(chalk.gray('Press Ctrl+C to stop both Vite and ngrok\n'));

    } catch (error) {
        console.error(chalk.red('❌ Failed to start ngrok:'), error.message);
        if (error.message.includes('authtoken')) {
            console.log(chalk.yellow('Tip: Make sure you have configured your ngrok authtoken if required.'));
        }
        process.exit(1);
    }
}

startNgrok();
