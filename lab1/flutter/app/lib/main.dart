import 'package:flutter/material.dart';

void main() {
  runApp(const MainApp());
}

// App theme constants
class AppTheme {
  static const Color primaryColor = Color(0xFFBFFFE1);
  static const Color secondaryColor = Color(0xFF587567);
}

// Main application widget
class MainApp extends StatelessWidget {
  const MainApp({super.key});

  @override
  Widget build(BuildContext context) {
    return const MaterialApp(
      home: HomeScreen(),
    );
  }
}

// Home screen widget
class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: _buildAppBar(),
      body: _buildBody(),
    );
  }

  PreferredSizeWidget _buildAppBar() {
    return AppBar(
      backgroundColor: AppTheme.primaryColor,
      title: const Center(
        child: Text(
          'Flutter',
          style: TextStyle(
            fontSize: 30.0,
            color: AppTheme.secondaryColor,
          ),
        ),
      ),
    );
  }

  Widget _buildBody() {
    return const Center(
      child: Column(
        children: <Widget>[
          CatImageWidget(),
          ButtonsWidget(),
          TextFieldWidget()
        ],
      ),
    );
  }
}

class ButtonsWidget extends StatelessWidget {
  const ButtonsWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return const Column(
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [ButtonWidget(), SizedBox(width: 10), ButtonWidget()],
        ),
        SizedBox(height: 10),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [ButtonWidget(), SizedBox(width: 10), ButtonWidget()],
        ),
      ],
    );
  }
}

class ButtonWidget extends StatelessWidget {
  const ButtonWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
      onPressed: () {},
      style: ElevatedButton.styleFrom(
          minimumSize: const Size(160.0, 60.0),
          shape:
              RoundedRectangleBorder(borderRadius: BorderRadius.circular(5))),
      child: const Text('BUTTON'),
    );
  }
}

class TextFieldWidget extends StatelessWidget {
  const TextFieldWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return const Padding(
      padding: EdgeInsets.only(left: 100.0, right: 100.0, top: 30.0),
      child: Row(
        children: [
          Padding(
            padding: EdgeInsets.only(right: 16.0),
            child: Text(
              'Cat name',
              style: TextStyle(fontSize: 20),
            ),
          ),
          Expanded(
            child: TextField(
              decoration: InputDecoration(
                border: OutlineInputBorder(),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

class CatImageWidget extends StatelessWidget {
  const CatImageWidget({super.key});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(60.0),
      child: Container(
        decoration: const BoxDecoration(
          color: AppTheme.primaryColor,
          shape: BoxShape.circle,
        ),
        child: Image.asset(
          'assets/images/cat.png',
          height: 200.0,
        ),
      ),
    );
  }
}
