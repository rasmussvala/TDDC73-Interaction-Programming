import 'package:flutter/material.dart';
import '../models/repository.dart';

class RepoPage extends StatelessWidget {
  final Repository repository;

  const RepoPage({super.key, required this.repository});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.amber,
          title: Text(repository.name),
        ),
        body: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Owner: ${repository.owner}'),
              Text('Stars: ${repository.stars}'),
              Text('Description: ${repository.description}'),
              Text('URL: ${repository.url}')
            ],
          ),
        ),
      ),
    );
  }
}
