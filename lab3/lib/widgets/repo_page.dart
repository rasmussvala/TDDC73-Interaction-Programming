import 'package:flutter/material.dart';

class RepoPage extends StatelessWidget {
  const RepoPage({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.amber,
          title: const Text('Repo'),
        ),
      ),
    );
  }
}
