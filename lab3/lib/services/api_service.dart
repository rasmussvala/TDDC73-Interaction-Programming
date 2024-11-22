import 'dart:convert';
import 'package:http/http.dart' as http;

import '../models/repository.dart';

class ApiService {
  static Future<List<Repository>> fetchTrendingRepositories() async {
    // Calculate the date one week ago
    final DateTime now = DateTime.now();
    final DateTime oneWeekAgo = now.subtract(const Duration(days: 7));
    final String oneWeekAgoDate =
        '${oneWeekAgo.year}-${oneWeekAgo.month.toString().padLeft(2, '0')}-${oneWeekAgo.day.toString().padLeft(2, '0')}';

    final String url =
        'https://api.github.com/search/repositories?q=created:>$oneWeekAgoDate&sort=stars&order=desc&per_page=20';

    final response = await http.get(Uri.parse(url));

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body) as Map<String, dynamic>;
      final items = data['items'] as List<dynamic>;
      return items
          .map((json) => Repository.fromJson(json as Map<String, dynamic>))
          .toList();
    } else {
      throw Exception('Failed to fetch repositories: ${response.reasonPhrase}');
    }
  }
}
